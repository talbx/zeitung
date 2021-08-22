import {Logger} from '@nestjs/common';

export abstract class AbstractUpdateService<T> {
    private readonly logger: Logger;
    private readonly context: string;

    protected constructor(logger: Logger, context: string) {
        this.logger = logger;
        this.context = context;
    }

    protected abstract execute(): Promise<T>;

    public getUpdate(): Promise<T> {
        this.logger.log(`Performing Update for Context ${this.context}`);
        return this.execute().then((res) => {
            this.logger.log(getLogMessage(res, this.context));
            this.logger.log(`Done fetching daily Update for Context ${this.context}!`);
            return res;
        });
    }
}

const getLogMessage = (response, context) => {
    return response
        ? `Received update for Context ${context}!`
        : `Received no updates for Context ${context}!`;
};
