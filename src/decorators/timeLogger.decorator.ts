import { performance } from "perf_hooks";
import Logger from "../lib/logger";

export const timeLogger = (
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor
): void => {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: unknown[]) {
    const timeStart = performance.now();
    await originalMethod.apply(this, args);
    const timeFinish = performance.now();
    const time = (timeFinish - timeStart).toFixed(0);
    Logger.info(`time finished ${time} ms`);
  };
};

export default timeLogger;
