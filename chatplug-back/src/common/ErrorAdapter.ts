export class ErrorAdapter {

    static parameters(className: string, parameters: Array<any>) {
        return `Bad parameters exception (${className}) : parameters = [${parameters}]`;
    }
}