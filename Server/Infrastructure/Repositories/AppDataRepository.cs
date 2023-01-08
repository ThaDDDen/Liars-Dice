using System.Linq.Expressions;
using Core.Entities.AppEntities;
using Core.Interfaces;
using Infrastructure.AppData;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class AppDataRepository<T> : IAppDataRepository<T> where T : BaseEntity
{
    private readonly AppDbContext _context;
    private DbSet<T> _entities;

    public AppDataRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await _entities.ToListAsync();
    } 
    
    public async Task<T> GetByIdAsync(Guid id)
    {
        return await _entities.FindAsync(id);
    }

    public async Task<T> AddAsync(T entity)
    {
        _entities.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> UpdateAsync(T entity)
    {
        _entities.Update(entity);
        return await _context.SaveChangesAsync() > 0; 
    }


    public async Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> predicate)
    {
        return await _entities.Where(predicate).ToListAsync();
    }


    public async Task<bool> DeleteAsync(T entity)
    {
        _entities.Remove(entity);
        return await _context.SaveChangesAsync() > 0;
    }
}