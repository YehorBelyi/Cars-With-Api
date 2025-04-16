using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarAPI.Models;

namespace CarAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoesController : ControllerBase
    {
        private readonly AutoShopContext _context;

        public AutoesController(AutoShopContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Auto>>> GetAutos(
            [FromQuery] int? page,           
            [FromQuery] int? pageSize,     
            [FromQuery] string? filter)
        {
            int currentPage = page ?? 1;
            int currentPageSize = pageSize ?? 6;

            IQueryable<Auto> query = _context.Autos;

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(auto => auto.Name.Contains(filter));
            }

            var totalItems = await query.CountAsync();

            var autos = await query
                .Skip((currentPage - 1) * currentPageSize) 
                .Take(currentPageSize)                     
                .ToListAsync();

            var totalPages = (int)Math.Ceiling(totalItems / (double)currentPageSize);

            Response.Headers.Append("X-Total-Count", totalItems.ToString());
            Response.Headers.Append("X-Total-Pages", totalPages.ToString());

            return Ok(autos);
        }




        // PUT: api/Autoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuto(int id, Auto auto)
        {
            if (id != auto.Id)
            {
                return BadRequest();
            }

            _context.Entry(auto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AutoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Autoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Auto>> PostAuto(Auto auto)
        {
            _context.Autos.Add(auto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuto", new { id = auto.Id }, auto);
        }

        // DELETE: api/Autoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuto(int id)
        {
            var auto = await _context.Autos.FindAsync(id);
            if (auto == null)
            {
                return NotFound();
            }

            _context.Autos.Remove(auto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AutoExists(int id)
        {
            return _context.Autos.Any(e => e.Id == id);
        }
    }
}
