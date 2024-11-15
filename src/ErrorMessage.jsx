const ErrorMessage = ({ error }) => {
    if (!error) return null; // If no error, return null (nothing to render)

    return (
        <div style={{ color: 'red', marginTop: '10px' }}>
            <strong>Error:</strong> {error}
        </div>
    );
};


export default ErrorMessage;