using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int currentPage { get; set; }

        public int totalPages { get; set; }

        public int pageSize { get; set; }

        public int totalCount { get; set; }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            this.totalCount = count;
            this.pageSize = pageSize;
            this.currentPage = pageNumber;
            this.totalPages = (int)Math.Ceiling(count/(double)pageSize);
            this.AddRange(items);
        }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();

            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}