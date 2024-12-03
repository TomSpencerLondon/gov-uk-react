import React, { useState, useCallback } from 'react';
import * as GovUK from 'govuk-react';

const MyForm = () => {
        const [firstName, setFirstName] = useState('');
        const [email, setEmail] = useState('');
        const [errors, setErrors] = useState({});
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [hasSubmitted, setHasSubmitted] = useState(false);

        const validateFirstName = (name) => {
                if (!name) return 'First name is required';
                if (name.length < 2) return 'First name must be at least 2 characters';
                return '';
        };

        const validateEmail = (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email) return 'Email is required';
                if (!emailRegex.test(email)) return 'Email must be a valid email address';
                return '';
        };

        const handleSubmit = useCallback(() => {
                setIsSubmitting(true);
                const newErrors = {
                        firstName: validateFirstName(firstName),
                        email: validateEmail(email),
                };

                if (Object.values(newErrors).some((error) => error)) {
                        setErrors(newErrors);
                        setIsSubmitting(false);
                } else {
                        setErrors({});
                        setTimeout(() => {
                                // Simulate async submission
                                setHasSubmitted(true);
                                setIsSubmitting(false);
                        }, 1000);
                }
        }, [firstName, email]);

        return (
            <>
                    {!hasSubmitted && (
                        <GovUK.LoadingBox loading={isSubmitting}>
                                {Object.keys(errors).length > 0 && (
                                    <GovUK.ErrorSummary
                                        heading="There is a problem"
                                        description="Please address the following issues:"
                                        errors={Object.keys(errors).map((key) => ({
                                                targetName: key,
                                                text: errors[key],
                                        }))}
                                    />
                                )}
                                <GovUK.Fieldset>
                                        <GovUK.Fieldset.Legend size="M">User Information</GovUK.Fieldset.Legend>
                                        <GovUK.Label error={!!errors.firstName}>
                                                <GovUK.LabelText>First Name</GovUK.LabelText>
                                                {errors.firstName && <GovUK.ErrorText>{errors.firstName}</GovUK.ErrorText>}
                                                <GovUK.Input
                                                    name="firstName"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    error={!!errors.firstName}
                                                />
                                        </GovUK.Label>
                                        <GovUK.Label error={!!errors.email}>
                                                <GovUK.LabelText>Email</GovUK.LabelText>
                                                {errors.email && <GovUK.ErrorText>{errors.email}</GovUK.ErrorText>}
                                                <GovUK.Input
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    error={!!errors.email}
                                                />
                                        </GovUK.Label>
                                </GovUK.Fieldset>
                                <GovUK.Button onClick={handleSubmit} disabled={isSubmitting}>
                                        Submit
                                </GovUK.Button>
                        </GovUK.LoadingBox>
                    )}
                    {hasSubmitted && (
                        <GovUK.Panel title="Submission Successful">
                                <GovUK.Paragraph>
                                        Thank you for submitting your information, {firstName}. We’ll be in touch at {email}.
                                </GovUK.Paragraph>
                                <GovUK.Button onClick={() => setHasSubmitted(false)}>Back</GovUK.Button>
                        </GovUK.Panel>
                    )}
            </>
        );
};

export default MyForm;
