import { environment } from '../../../environments/environment';

function Deprecated(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
  if (environment.production) {
    return descriptor;
  }

  const className = target?.constructor?.name || '';
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    console.warn(`${className}: ${propertyKey} is deprecated!`);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

export { Deprecated };
