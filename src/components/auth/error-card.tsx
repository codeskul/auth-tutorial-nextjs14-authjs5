import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import { CardWrapper } from "./card-wrapper"

export const ErrorCard = () => {
    return (
        <CardWrapper headerLabel="Opps! Something went wrong!"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login">
            <div className="flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    )
} 