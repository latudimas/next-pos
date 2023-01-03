import { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { AllowedMethod, isAllowedMethod } from "./allowedMethods";

type CreateApiRouteCreatorArgs<Context> = {
  middleware?: Array<(req: Req, res: Res) => Promise<void>>;
  unimplementedMethod: (req: Req, res: Res, ctx: Context) => any;
  createContext(req: Req, res: Res): Context;
  handleError?: (req: Req, res: Res, error: unknown) => void;
};

type CreateApiRouteArgs<Context> = {
  // using property accessor to get value from createRouteApi (get, pos, put, etc)
  [method in AllowedMethod]?: (req: Req, res: Res, ctx: Context) => any;
} & {
  // include any local middleware if any
  middleware?: Array<(req: Req, res: Res) => Promise<void>>;
};

export function createApiRouteCreator<Context>(
  args: CreateApiRouteCreatorArgs<Context>
) {
  return (options: CreateApiRouteArgs<Context>) => {
    return async (req: Req, res: Res) => {
      try {
        const middleware = [
          ...(args.middleware ?? []), // The nullish coalescing operator (??) enables us to specify a fallback for when a value is undefined or null
          ...(options.middleware ?? []),
        ];

        for await(const mdw of middleware) {
          await mdw(req, res)
        }

        const context = args.createContext(req, res);
        const _method = req.method?.toLowerCase();

        const handler = isAllowedMethod(_method)
          ? options[_method] ?? args.unimplementedMethod
          : args.unimplementedMethod;

        await handler(req, res, context);
      } catch (error: unknown) {
        args.handleError?.(req, res, error);
      }
    };
  };
}
