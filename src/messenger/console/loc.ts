/**
 * @file Provides utility functions for logging and displaying messages in the console,
 * particularly for organizing output into collapsible groups and displaying source code locations.
 */

import { Stack, isPromise } from "woby"



// export function isAsyncGenerator<T>(input: any): input is AsyncGenerator<T> {
//     return input &&
//         typeof input[Symbol.asyncIterator] === 'function' &&
//         typeof input.next === 'function'
// }

// export function isGenerator<T>(input: any): input is Generator<T> {
//     return input &&
//         typeof input[Symbol.iterator] === 'function' &&
//         typeof input.next === 'function'
// }

// export async function* toGenerator<T>(msg: { log: typeof console.log, error: typeof console.error, warn: typeof console.warn }) {
//     const resolved = typeof msg === 'function' ? (msg as Function)() : msg

//     if (isAsyncGenerator<T>(resolved))
//         for await (const item of resolved) yield item
//     else if (isGenerator<T>(resolved))
//         for (const item of resolved) yield item
//     else {
//         const array = await Promise.resolve(resolved)
//         for (const item of array as T[]) yield item
//     }
// }
type AsyncFunc = (...args: any[]) => Promise<any>

/**
 * Checks if a given function is an asynchronous function.
 * @param fn The function to check.
 * @returns `true` if the function is asynchronous, `false` otherwise.
 */
function isAsyncFunction(fn: unknown): fn is AsyncFunc {
    return (
        typeof fn === 'function' &&
        fn.constructor &&
        fn.constructor.name === 'AsyncFunction'
    )
}

/**
 * Logs messages to the console, optionally within a collapsible group, and provides a logging context.
 * This function is used for structured output of test results and other information.
 * 
 * @template T The type of the title or message parts.
 * @template S The type of the message content.
 * @param title The title of the log group, which can be a string, an array of strings, or a 2D array of strings.
 * @param collapse A boolean indicating whether the console group should be collapsed by default.
 * @param msg A function that receives a console-like object (`log`, `error`, `warn`) to perform the actual logging.
 *            This function can be synchronous or asynchronous.
 */
export async function loc<T, S>(title: T | T[] | T[][], collapse: boolean, msg: (p: { log: typeof console.log, error: typeof console.error, warn: typeof console.warn }) => void) {
    const groupFn = collapse ? console.groupCollapsed : console.group
    groupFn(...(Array.isArray(title) ? title : [title]))

    if (isPromise(msg) || isAsyncFunction(msg))
        await msg(console)
    else
        msg(console)

    console.groupEnd()
}

/**
 * Logs a stack trace to the console with a given title.
 * This is a utility function for displaying the call stack at a specific point.
 * @template T The type of the title parts.
 * @param title An array of strings to be used as the title for the log.
 */
export function los<T>(title: T[]) {
    loc(title, false, ({ log }) => log(new Stack('', 1)))
}