/**
 * Given a type `TType` and a type `TRequired` which is a subset of required keys of `TType`, return a new type which is the
 * same as `TType` but with all keys optional except those in `TRequired`.
 */
export type PartialExcept<
	TType,
	TRequired extends keyof TType,
> = Partial<TType> & Pick<TType, TRequired>;
