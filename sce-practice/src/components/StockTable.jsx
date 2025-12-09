const StockTable = ({data}) => {
  return (
    <table>
        <thead style={{flex: 1, color: 'cyan', padding: "15 px", justifyContent: "center", alignItems: "center"}}>
            <tr style={{justifyItems: "center", alignItems: "center"}}>
                <th>Open Price</th>
                <th>High Price</th>
                <th>Low Price</th>
                <th>Current Price</th>
                <th>Previous Close Price</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody style={{justifyItems: "center", alignItems: "center"}}>
            {data.map((item, index) => {
                return (
                    <tr key={item.time} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                        <td>${item.open}</td>
                        <td>${item.high}</td>
                        <td>${item.low}</td>
                        <td>${item.current}</td>
                        <td>${item.previousClose}</td>
                        <td>{item.time}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default StockTable