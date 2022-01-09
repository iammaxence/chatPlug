export class ErrorUseCase {

    public static doNotExists(className: string, methodName: string, parameters: Array<any>) {
        return `Not found exception (${className} | ${methodName}) : parameters = [${parameters}]`;
    }
}