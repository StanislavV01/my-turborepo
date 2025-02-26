"use client"
import { useEffect, useState, useCallback } from "react"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { CoinData } from "@/src/types/token"
import { ApiResponse } from "@/src/types/ApiResponse"
import axiosInstance from "@/src/lib/axiosInstance"

const ITEMS_PER_PAGE = 10

interface TokensTableState {
  tokens: CoinData[]
  loading: boolean
  error: string | null
  page: number
  totalCount: number
}

const initialState: TokensTableState = {
  tokens: [],
  loading: true,
  error: null,
  page: 1,
  totalCount: 0,
}

export default function TokensTable() {
  const [state, setState] = useState<TokensTableState>(initialState)
  const { tokens, loading, error, page, totalCount } = state

  const fetchTokens = useCallback(async (currentPage: number) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const response = await axiosInstance.get<ApiResponse>(
        `/data/top/price?limit=${ITEMS_PER_PAGE}&tsym=USD&page=${currentPage}`
      )

      if (!response.data?.Data) {
        throw new Error('Invalid data format received from API')
      }

      setState(prev => ({
        ...prev,
        tokens: response.data.Data,
        totalCount: response.data.MetaData?.Count ?? 0,
        loading: false,
      }))
    } catch (err) {
      console.error('Error fetching tokens:', err)
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to fetch tokens. Please try again later.',
        loading: false,
      }))
    }
  }, [])

  useEffect(() => {
    fetchTokens(page)
  }, [page, fetchTokens])

  const handlePageChange = useCallback((newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-lg">Loading tokens...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p>{error}</p>
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