using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Data;
using Services.Models;

namespace Services.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly AppDbContext _db;

        public BudgetController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/Budget
        [HttpGet]
        public ActionResult<IEnumerable<Budget>> GetAll()
        {
            return Ok(_db.Budgets
                .Include(b => b.Categories)
                .ToList());
        }

        // GET: api/Budget/{id}
        [HttpGet("{id}")]
        public ActionResult<Budget> GetById(Guid id)
        {
            var budget = _db.Budgets
                .Include(b => b.Categories)
                .FirstOrDefault(b => b.Id == id);

            if (budget == null)
            {
                return NotFound();
            }

            return Ok(budget);
        }

        // POST: api/Budget
        [HttpPost]
        public ActionResult<Budget> Create([FromBody] Budget budget)
        {
            budget.Id = Guid.NewGuid();
            _db.Budgets.Add(budget);
            _db.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = budget.Id }, budget);
        }

        // PUT: api/Budget/{id}
        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody] Budget budget)
        {
            if (id != budget.Id)
            {
                return BadRequest();
            }

            _db.Entry(budget).State = EntityState.Modified;
            _db.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Budget/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var budget = _db.Budgets.Find(id);
            if (budget == null)
            {
                return NotFound();
            }

            _db.Budgets.Remove(budget);
            _db.SaveChanges();

            return NoContent();
        }
    }
}
