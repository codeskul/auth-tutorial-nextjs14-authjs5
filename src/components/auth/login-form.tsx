import { CardWrapper } from "./card-wrapper"

export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel="Welcome bank"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            <h1>Login Form</h1>
        </CardWrapper>
    )
}