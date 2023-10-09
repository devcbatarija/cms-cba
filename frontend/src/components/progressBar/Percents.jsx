import { Line } from "rc-progress";

const Percents = ({uploadProgress,funcional}) => {
    return (
      <>
        <div className="flex flex-cols- items-center justify-center w-full">
          <h1 className="text-blue-800 mb-1 text-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-sm lg:text-sm dark:text-white">
            {funcional}:{uploadProgress}%{uploadProgress==100?"Complete":null}
          </h1>
        </div>
        <div className="flex flex-cols- items-center justify-center w-full pb-2">
          <Line
            steps={20}
            percent={uploadProgress}
            strokeWidth={1}
            strokeColor={"green"}
            className="w-10/12"
          > 
          </Line>
        </div>
      </>
    );
  };
export default Percents;