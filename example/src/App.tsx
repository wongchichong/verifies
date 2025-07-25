import { DEBUGGER } from 'woby'
import * as sample from './sample.test'
// import * as example from './example.test'
import * as comps from './components.test'
import { Verify, Csf } from 'verifies'

interface MyComponentProps {
    message: string
    count: number
    timestamp: Date
}

function MyComponent(props: MyComponentProps) {
    return (
        <div>
            <h1>Hello, {props.message}!</h1>
            <p>Count: {props.count}</p>
            <p>Timestamp: {props.timestamp.toISOString()}</p>
            <button>Click Me</button>
        </div>
    )
}

const isDev = typeof import.meta.env !== 'undefined' && import.meta.env.DEV

if (isDev)
    DEBUGGER.test = true

export function App() {
    const now = new Date()
    console.log('APP')
    return (
        <div>
            Explicit test
            <Verify name="MyComponent 1" message="World" count={1} timestamp={now}>
                <MyComponent message="World" count={1} timestamp={now} />
            </Verify>

            <Verify name="MyComponent 2" message="Woby" count={2} timestamp={new Date(2025, 0, 2, 0, 0, 0, 0)}>
                <MyComponent message="Woby" count={2} timestamp={new Date(new Date(2025, 0, 2, 0, 0, 0, 0))} />
            </Verify>
            Components Story Format
            <Csf module={comps} path='components.test' />


            Run test(), see browser debugger console
            <Csf module={sample} />

        </div>
    )
}
