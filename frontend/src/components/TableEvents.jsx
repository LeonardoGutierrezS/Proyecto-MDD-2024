import deleteIcon from '../assets/deleteIcon.svg';
import updateIcon from '../assets/updateIcon.svg';

const TableEvents = ({ columns, data, onDelete, onEdit }) => {
  return (
    <table id="events">
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
          data.map((row) => (
            <tr key={row._id}>
              {columns.map((col) => (
                <td key={col}>
                  {col === 'Acción' ? (
                    <>
                      <img 
                        src={updateIcon} 
                        alt="Editar" 
                        style={{ marginRight: '10px', cursor: 'pointer', width: '24px', height: '24px' }}
                        onClick={() => onEdit(row._id)} //ojo
                      />
                      <img 
                        src={deleteIcon} 
                        alt="Eliminar" 
                        style={{ cursor: 'pointer', width: '24px', height: '24px' }} 
                        onClick={() => onDelete(row._id)} //ojo
                      />
                    </>
                  ) : (
                    row[col]
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TableEvents;
