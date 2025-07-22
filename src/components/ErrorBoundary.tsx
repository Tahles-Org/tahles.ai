
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('🚨 Error boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Error boundary details:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
    
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                שגיאה בטעינת הדף
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                אירעה שגיאה בטעינת הדף. אנא נסה לרענן את הדף או לחזור לעמוד הבית.
              </p>
              
              {this.state.error && (
                <div className="bg-muted p-3 rounded-md text-sm">
                  <strong>שגיאה:</strong> {this.state.error.message}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="default"
                  size="sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  רענן דף
                </Button>
                <Button 
                  onClick={() => window.location.href = '/'} 
                  variant="outline"
                  size="sm"
                >
                  עמוד הבית
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
