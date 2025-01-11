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
    public class TransactionController : ControllerBase
    {
        private readonly AppDbContext _db;

        public TransactionController(AppDbContext db)
        {
            _db = db;
        }

        // GET: api/Transaction
        [HttpGet]
        public ActionResult<IEnumerable<Transaction>> GetAll()
        {
            return Ok(_db.Transactions.ToList());
        }

        // GET: api/Transaction/budget/{budgetId}
        [HttpGet("budget/{budgetId}")]
        public ActionResult<IEnumerable<Transaction>> GetByBudget(Guid budgetId)
        {
            return Ok(_db.Transactions
                .Where(t => t.BudgetId == budgetId)
                .OrderByDescending(t => t.Date)
                .ToList());
        }

        // GET: api/Transaction/{id}
        [HttpGet("{id}")]
        public ActionResult<Transaction> GetById(Guid id)
        {
            var transaction = _db.Transactions.Find(id);
            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        // POST: api/Transaction
        [HttpPost]
        public ActionResult<Transaction> Create([FromBody] Transaction transaction)
        {
            // Verify budget exists
            if (!_db.Budgets.Any(b => b.Id == transaction.BudgetId))
            {
                return BadRequest(new { message = "Invalid budget ID" });
            }

            transaction.Id = Guid.NewGuid();
            transaction.Date = transaction.Date.ToUniversalTime();
            
            _db.Transactions.Add(transaction);
            _db.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = transaction.Id }, transaction);
        }

        // PUT: api/Transaction/{id}
        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody] Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest();
            }

            // Verify budget exists
            if (!_db.Budgets.Any(b => b.Id == transaction.BudgetId))
            {
                return BadRequest(new { message = "Invalid budget ID" });
            }

            transaction.Date = transaction.Date.ToUniversalTime();
            _db.Entry(transaction).State = EntityState.Modified;
            _db.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Transaction/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var transaction = _db.Transactions.Find(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _db.Transactions.Remove(transaction);
            _db.SaveChanges();

            return NoContent();
        }
    }
}
