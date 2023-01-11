using System.Linq.Expressions;
using Core.Entities.AppEntities;

namespace Core.Interfaces;
public interface IAppDataRepository<T> where T : BaseEntity
{
    Task<List<T>> GetAllAsync();
    Task<T> GetByIdAsync(Guid id);
    Task<T> AddAsync(T entity);
    Task<bool> UpdateAsync(T entity);
    Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> predicate);
    Task<bool> DeleteAsync(T entity);
}