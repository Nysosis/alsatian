import "reflect-metadata";
import { ISetupTeardownMetadata } from "./_interfaces";
import { SETUP } from "./_metadata-keys";
import { Unused } from "../unused";

export function Setup(target: object, decoratedPropertyKey: string, descriptor?: TypedPropertyDescriptor<() => any>) {
    Unused(descriptor);

    let setupFunctions: Array<ISetupTeardownMetadata> = Reflect.getMetadata(SETUP, target);

    if (!setupFunctions) {
      setupFunctions = [];
    }

    setupFunctions.push({
        isAsync: false,
        propertyKey: decoratedPropertyKey
    });

    // mark as setup test method
    Reflect.defineMetadata(SETUP, setupFunctions, target);
}
