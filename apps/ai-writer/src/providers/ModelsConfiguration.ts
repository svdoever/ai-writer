import { ModelConfiguration } from "./ModelConfiguration";


export type ModelsConfiguration = {
    defaultModel: string;
    recipeDefaultModel: {
        [key: string]: string;
    };
    modelConfigurations: {
        [key: string]: ModelConfiguration;
    };
};
