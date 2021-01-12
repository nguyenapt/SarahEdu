using Abp.Data;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.EntityFrameworkCore;
using Abp.EntityFrameworkCore.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using static System.Boolean;

namespace Sarah.Education.EntityFrameworkCore.Repositories
{
    /// <summary>
    /// Base class for custom repositories of the application.
    /// </summary>
    /// <typeparam name="TEntity">Entity type</typeparam>
    /// <typeparam name="TPrimaryKey">Primary key type of the entity</typeparam>
    public abstract class EducationRepositoryBase<TEntity, TPrimaryKey> : EfCoreRepositoryBase<EducationDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        private readonly IActiveTransactionProvider _transactionProvider;

        protected EducationRepositoryBase(IDbContextProvider<EducationDbContext> dbContextProvider, IActiveTransactionProvider transactionProvider)
            : base(dbContextProvider)
        {
            _transactionProvider = transactionProvider;

        }

        public async Task<List<TResult>> GetResultsBySqlCommand<TResult>(string commandText) where TResult : class
        {
            try
            {
                //EnsureConnectionOpen();
                using (var command = CreateCommand(commandText, CommandType.Text))
                {
                    using (var dataReader = await command.ExecuteReaderAsync())
                    {
                        var result = new List<TResult>();

                        while (dataReader.Read())
                        {
                            var item = ParseResultFromDb<TResult>(dataReader);
                            result.Add(item);
                        }

                        return result;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<TResult>> GetResultsByStoreProcedure<TResult, TRequest>(string storeProcedureName, TRequest request) where TResult : class where TRequest : class
        {
            try
            {
                //EnsureConnectionOpen();
                using (var command = CreateCommand(storeProcedureName, CommandType.StoredProcedure, GetRequestParameters<TRequest>(request).ToArray()))
                {
                    using (var dataReader = await command.ExecuteReaderAsync())
                    {
                        var result = new List<TResult>();

                        while (dataReader.Read())
                        {
                            var item = ParseResultFromDb<TResult>(dataReader);
                            result.Add(item);
                        }

                        return result;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        private T ParseResultFromDb<T>(DbDataReader dataReader) where T : class
        {
            var result = (T)Activator.CreateInstance(typeof(T));
            var properties = result.GetType().GetProperties();
            foreach (var prop in properties)
            {
                try
                {
                    var data = dataReader[prop.Name];
                    if (data == DBNull.Value || data == null) continue;

                    if (prop.PropertyType == typeof(string))
                    {
                        prop.SetValue(result, data.ToString());
                    }
                    else if ((prop.PropertyType == typeof(bool) || prop.PropertyType == typeof(bool?))
                             && TryParse(data.ToString(), out var boolValue))
                    {
                        prop.SetValue(result, boolValue);
                    }
                    else if ((prop.PropertyType == typeof(double) || prop.PropertyType == typeof(double?)) && double.TryParse(data.ToString(), out double doubleValue))
                    {
                        prop.SetValue(result, doubleValue);
                    }
                    else if ((prop.PropertyType == typeof(DateTime) || prop.PropertyType == typeof(DateTime?))
                             && DateTime.TryParse(data.ToString(), out var dtValue))
                    {
                        prop.SetValue(result, dtValue);
                    }
                    else if ((prop.PropertyType == typeof(Guid) || prop.PropertyType == typeof(Guid?))
                             && Guid.TryParse(data.ToString(), out Guid guidValue))
                    {
                        prop.SetValue(result, guidValue);
                    }
                    else if ((prop.PropertyType == typeof(int) || prop.PropertyType == typeof(int?))
                             && int.TryParse(data.ToString(), out int intValue))
                    {
                        prop.SetValue(result, intValue);
                    }
                    else if ((prop.PropertyType == typeof(byte) || prop.PropertyType == typeof(byte?))
                             && byte.TryParse(data.ToString(), out byte byteValue))
                    {
                        prop.SetValue(result, byteValue);
                    }
                    else if ((prop.PropertyType == typeof(decimal) || prop.PropertyType == typeof(decimal?))
                             && decimal.TryParse(data.ToString(), out decimal decimalValue))
                    {
                        prop.SetValue(result, decimalValue);
                    }

                }
                catch (Exception)
                {
                    // ignored
                }
            }
            return result;
        }
        private IEnumerable<SqlParameter> GetRequestParameters<T>(T request) where T : class
        {
            var parameters = new List<SqlParameter>();
            var properties = request.GetType().GetProperties();
            foreach (var prop in properties)
            {
                var val = prop.GetValue(request, null);
                var sqlParameter = new SqlParameter(prop.Name, val != null ? val : (object)DBNull.Value);
                parameters.Add(sqlParameter);
            }
            return parameters;
        }
        private DbCommand CreateCommand(string commandText, CommandType commandType, params SqlParameter[] parameters)
        {
            var connection = Context.Database.GetDbConnection();

            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }
            var command = connection.CreateCommand();

            command.CommandText = commandText;
            command.CommandType = commandType;
            command.Transaction = GetActiveTransaction();

            foreach (var parameter in parameters)
            {
                command.Parameters.Add(parameter);
            }

            return command;
        }

        private DbTransaction GetActiveTransaction()
        {
            return (DbTransaction)_transactionProvider.GetActiveTransaction(new ActiveTransactionProviderArgs
            {
                {"ContextType", typeof(EducationDbContext) },
                {"MultiTenancySide", MultiTenancySide }
            });
        }

        // Add your common methods for all repositories
    }

    /// <summary>
    /// Base class for custom repositories of the application.
    /// This is a shortcut of <see cref="EducationRepositoryBase{TEntity,TPrimaryKey}"/> for <see cref="int"/> primary key.
    /// </summary>
    /// <typeparam name="TEntity">Entity type</typeparam>
    public abstract class EducationRepositoryBase<TEntity> : EducationRepositoryBase<TEntity, int>, IRepository<TEntity>
        where TEntity : class, IEntity<int>
    {
        protected EducationRepositoryBase(IDbContextProvider<EducationDbContext> dbContextProvider, IActiveTransactionProvider transactionProvider)
            : base(dbContextProvider, transactionProvider)
        {
        }

        // Do not add any method here, add to the class above (since this inherits it)!!!
    }
}
