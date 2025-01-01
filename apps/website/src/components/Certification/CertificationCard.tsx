import dayjs from "dayjs"

const CertificationCard = ({ data }: any) => {
  return (
    <div className="flex justify-center items-center shadow-lg rounded-lg p-8 max-w-screen-lg">
      <div className="w-full rounded-lg border-8 border-[#35cc71] bg-white p-6 shadow-lg">
        <div className="border-4 border-[#cc355b] p-12">
          <div className="text-center">
            <img src="/logo_full.svg" alt="logo" className="w-48" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">CERTIFICATE</h1>
            <h2 className="mt-2 text-2xl text-gray-600">of Excellence</h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-red-300"></div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700">This Certificate Is Proudly Presented To</p>
            <p className="mt-2 text-xl font-medium text-gray-800">{data?.wallet}</p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700">Has passed</p>
            <p className="mt-2 text-2xl font-semibold text-gray-800">{data?.poolName}</p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700">On</p>
            <p className="mt-2 text-xl text-gray-800">{dayjs(data?.createdAt).format("DD/MM/YYYY HH:mm")}</p>
          </div>
          <div className="flex justify-end">
            <img src="/logo.svg" alt="logo" className="w-12" />
          </div>
        </div>
      </div>
    </div>

  )
}

export default CertificationCard
