type LoadingProps = {
  width?: number
  height?: number
  aspectRatio?: number
}

const Loading = (props: LoadingProps) => {
  const styles = {
    width: props.width || undefined,
    height: props.height || undefined,
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-300"></div>
    </div>
  )
}
export default Loading
