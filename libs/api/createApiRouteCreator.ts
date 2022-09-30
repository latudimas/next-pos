import { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { Context } from "vm";
import { AllowedMethod, isAllowedMethod } from "./allowedMethods";

type CreateApiRouteCreatorArgs<Context> = {
  createContext(req: Req, res: Res): Context;
  unimplementedMethod: (req: Req, res: Res, ctx: Context) => any;
  middleware?: Array<(req: Req, res: Res) => Promise<void>>;
  handleError?: (req: Req, res: Res, error: unknown) => void;
};

type CreateApiRouteArgs<Context> = {
  [method in AllowedMethod]?: (req: Req, res: Res, ctx: Context) => any;
} & {
  middleware?: Array<(req: Req, res: Res) => Promise<void>>;
};

export function createApiRouteCreator<Context>(
  args: CreateApiRouteCreatorArgs<Context>
) {
  return function createApiRoute(options: CreateApiRouteArgs<Context>) {
    return async function handler(req: Req, res: Res) {
      try {
        const middleware = [
          ...(args.middleware ?? []), // The nullish coalescing operator (??) enables us to specify a fallback for when a value is undefined or null
          ...(options.middleware ?? []),
        ];

        for await( const mw of middleware) {
          await mw(req, res)
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
