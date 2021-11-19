import Logger from "../lib/logger";

export const ControllerLogger = (
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void => {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: unknown[]) {
    try {
      await originalMethod.apply(this, args);
    } catch (e) {
      Logger.error("error in controller", {
        methodName: propertyKey,
        arguments: args,
        errorMessage: e.message,
      });
      throw Error(e);
    }
  };
};

export default ControllerLogger;
