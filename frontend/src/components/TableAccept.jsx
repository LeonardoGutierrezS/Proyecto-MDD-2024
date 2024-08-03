const TableAccept = ({ columns, data, onAccept, onReject }) => {
    const totalRows = 7;
    const numEmptyRows = totalRows - (data.length > 0 ? data.length : 1);
  
    return (
      <table id="users">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="no-data">
                No se encontraron resultados.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col}>
                    {col === 'Acción' ? (
                      <>
                        {row.Estado === 'pendiente' ? (
                          <>
                            <button 
                              onClick={() => onAccept(row.id)} 
                              className="accept-button"
                            >
                              Aceptar
                            </button>
                            <button 
                              onClick={() => onReject(row.id)} 
                              className="reject-button"
                            >
                              Rechazar
                            </button>
                          </>
                        ) : (
                          'N/A'
                        )}
                      </>
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
          {Array.from({ length: numEmptyRows }).map((_, index) => (
            <tr key={`empty-${index}`} className="empty-row">
              {columns.map((col) => (
                <td key={`${col}-empty-${index}`}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default TableAccept;