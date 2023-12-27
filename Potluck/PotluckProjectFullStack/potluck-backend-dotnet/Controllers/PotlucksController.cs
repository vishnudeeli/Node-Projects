using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using potluck_backend_dotnet.Data;
using potluck_backend_dotnet.Models;

namespace potluck_backend_dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PotlucksController : ControllerBase
    {
        private readonly PotluckProjectDBContext _context;
        private DbContextOptions<PotluckProjectDBContext> options;

        public PotlucksController(PotluckProjectDBContext context)
        {
            _context = context;
        }

        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Potluck>>> GetStudent()
        {
            return await _context.Potluck.ToListAsync();
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Potluck>> GetStudent(int id)
        {
            var student = await _context.Potluck.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // PUT: api/Students/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudent(int id, [FromBody] AddPotluckRequest student)
        {
            var result = _context.Potluck.Find(id);
            if (id == null)
            {
                return BadRequest();
            }
            else
            {
                result.EmpName = student.EmpName;
                result.EmpId = student.EmpId;
                result.DishName = student.DishName;
                result.DishUrl = student.DishUrl;
                result.Description = student.Description;

                await _context.SaveChangesAsync();
                return Ok(result);
            }
        }

        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Potluck>> PostStudent(AddPotluckRequest student)
        {
            var Student = new Potluck
            {
                EmpName = student.EmpName,
           EmpId = student.EmpId,
            DishName = student.DishName,
            DishUrl = student.DishUrl,
            Description = student.Description
        };
            await _context.Potluck.AddAsync(Student);
            await _context.SaveChangesAsync();
            return Ok(Student);

            //return CreatedAtAction("GetStudent", new { id = student.Id }, student);
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Potluck.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Potluck.Remove(student);
            await _context.SaveChangesAsync();

            return Ok(student);
        }

        private bool StudentExists(int id)
        {
            return _context.Potluck.Any(e => e.Id == id);
        }

    }
}
