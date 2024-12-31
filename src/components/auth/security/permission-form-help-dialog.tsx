"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Button,
} from "@roxom-markets/spark-ui";
import { HelpCircle } from "lucide-react";

interface FieldHelpInfo {
    title: string;
    description: string;
    examples: string[];
}

const FIELD_HELP: Record<string, FieldHelpInfo> = {
    entity: {
        title: "Entity",
        description:
            "The resource or object that the permission applies to. This should be a noun representing what is being accessed.",
        examples: [
            "user - For user-related permissions",
            "dashboard_finance-report - For financial dashboard report access",
        ],
    },
    action: {
        title: "Action",
        description:
            "The operation that can be performed on the entity. This should be a verb describing what can be done.",
        examples: [
            "create - Allow creating new instances",
            "read - Allow viewing or accessing",
            "update - Allow modifying existing instances",
            "delete - Allow removing instances",
            "manage - Full control over the entity",
        ],
    },
    description: {
        title: "Description",
        description:
            "A clear explanation of what the permission allows. This helps administrators understand the permission's purpose.",
        examples: [
            "Allows creating new user accounts",
            "Enables viewing user profiles",
            "Permits full management of roles",
            "Grants access to system settings",
        ],
    },
};

export const PermissionFormHelpDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <HelpCircle className="h-5 w-5" />
                    <span className="sr-only">Help with permission form</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Permission Form Help</DialogTitle>
                    <DialogDescription>
                        Learn how to create effective and secure permissions
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {Object.entries(FIELD_HELP).map(([key, info]) => (
                        <div key={key} className="space-y-2">
                            <h3 className="text-lg font-semibold">
                                {info.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {info.description}
                            </p>
                            <div className="pl-4">
                                <h4 className="text-sm font-medium mb-2">
                                    Examples:
                                </h4>
                                <ul className="list-disc pl-4 space-y-1">
                                    {info.examples.map((example, index) => (
                                        <li
                                            key={index}
                                            className="text-sm text-muted-foreground"
                                        >
                                            {example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 p-4 bg-muted rounded-lg">
                        <h3 className="text-sm font-semibold mb-2">
                            Best Practices
                        </h3>
                        <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
                            <li>
                                Use clear, descriptive names that follow the
                                entity:action pattern
                            </li>
                            <li>
                                Keep entities and actions consistent across
                                related permissions
                            </li>
                            <li>
                                Write descriptions that clearly explain the
                                permission&apos;s scope
                            </li>
                            <li>
                                Consider the principle of least privilege when
                                creating permissions
                            </li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
