"use client"
import { useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { ApiResponse } from "@/src/types/ApiResponse"
import { axiosClientInstance } from "@/src/lib/axiosInstance"
import { useState } from "react"

const ITEMS_PER_PAGE = 10

export default function TokensTable() {
  const [page, setPage] = useState(1)

  const fetchTokens = useCallback(async (page: number) => {
    const { data } = await axiosClientInstance.get<ApiResponse>(
      `/tokens?page=${page}&limit=${ITEMS_PER_PAGE}`
    )
    return data
  }, [])

  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['tokens', page],
    queryFn: () => fetchTokens(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  })

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-lg">Loading tokens...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p>{(error as Error)?.message || 'Failed to fetch tokens. Please try again later.'}</p>
          <button
            onClick={() => fetchTokens(page)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const tokens = data?.Data || []
  const totalCount = data?.MetaData?.Count || 0

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Cryptocurrency Tokens</h1>
      <DataTable
        columns={columns}
        data={tokens}
        pageCount={Math.ceil(totalCount / ITEMS_PER_PAGE)}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  )
} 