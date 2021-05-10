
import { NextFunction, Request, Response } from 'express';

export default interface ParameterChecker {
    checkBodyParamTypes:
    (req: Request, res: Response, next: NextFunction)
        => Response<any, Record<string, any>> | undefined;

    checkQueryStringParamTypes:
    (req: Request, res: Response, next: NextFunction)
        => Response<any, Record<string, any>> | undefined;
}
