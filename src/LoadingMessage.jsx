const LoadingMessage = ({ loading }) => {

    return (
        <div>
            <strong>{loading && 'Loading...'}</strong>
        </div>
    );
};

export default LoadingMessage;