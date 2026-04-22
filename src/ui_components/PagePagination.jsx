import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PagePagination = ({numberOfPages}) => {
  return (
    <Pagination className="my-6 dark:text-white">
        <PaginationContent>

            <PaginationItem>
                <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>

            <PaginationItem>
                <PaginationLink href="#">
                    2
                </PaginationLink>
            </PaginationItem>

            <PaginationItem>
                <PaginationNext href="#" />
            </PaginationItem>

        </PaginationContent>
    </Pagination>
  )
}

export default PagePagination