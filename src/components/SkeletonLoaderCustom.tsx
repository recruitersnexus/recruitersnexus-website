import React from 'react'
import SkeletonLoader from './SkeletonLoader'
const SkeletonLoaderCustom = () => {
  return (
    <div>
        <SkeletonLoader className="flex flex-col h-screen">
  {/* Navbar */}
  <div className="bg-gray-200 h-16 mb-4"></div>

  {/* Two medium-sized boxes */}
  <div className="flex gap-4">
    {/* Box 1 */}
    <div className="w-1/2 bg-gray-200 h-40 p-4">
      <div className="h-4 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-300"></div>
    </div>

    {/* Box 2 */}
    <div className="w-1/2 bg-gray-200 h-40 p-4">
      <div className="h-4 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-300"></div>
    </div>
  </div>

  {/* Two huge-sized boxes */}
  <div className="flex gap-4 flex-1">
    {/* Box 3 */}
    <div className="w-1/2 bg-gray-200 h-96 p-4">
      <div className="h-4 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-300"></div>
    </div>

    {/* Box 4 */}
    <div className="w-1/2 bg-gray-200 h-96 p-4">
      <div className="h-4 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-300"></div>
    </div>
  </div>
</SkeletonLoader>
    </div>
  )
}

export default SkeletonLoaderCustom