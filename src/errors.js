export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class InvalidEntityError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidEntityError';
    }
}

export class InvalidUUIDError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidUUIDError';
    }
}