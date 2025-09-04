'use client'

import * as React from 'react'

interface State { hasError: boolean }

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <div>Failed to load</div>
    }
    return this.props.children
  }
}
