import { React, PureComponent } from "react";
import { DateTime } from "luxon";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Label,
} from "recharts";

const History = (props) => {
    const offset = DateTime.fromSQL(props.data[0].date, { zone: "UTC" }).setZone(DateTime.local().zoneName).toSeconds();
    const data = props.data.map((d) => {
        return {
            value: d.value,
            date: DateTime.fromSQL(d.date, { zone: "UTC" }).setZone(DateTime.local().zoneName).toSeconds(),
        };
    });

    return (
        <>
            <h3 className="text-3xl">{props.name}</h3>
            <LineChart
                style={{ marginLeft: "auto", marginRight: "auto" }}
                width={730}
                height={500}
                margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                data={data}
            >
                <Line type="monotone" dataKey="value" stroke="#fbd38d" dot={false} />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    type="number"
                    tickCount={14}
                    domain={["dataMin", "dataMax"]}
                    tick={<CustomizedAxisTick />}
                    height={90}
                />
                <YAxis dataKey="value" type="number"></YAxis>
                <Tooltip content={CustomTooltip} />
            </LineChart>
        </>
    );
};

class CustomizedAxisTick extends PureComponent {
    render() {
        const { x, y, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text className="Graph-Label" x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-40)">
                    {DateTime.fromSeconds(payload.value).toLocaleString()}
                </text>
            </g>
        );
    }
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div className="custom-tooltip bg-white border-orange-300 border-2 rounded-lg p-1">
                <p className="label">{DateTime.fromSeconds(label).toLocaleString()}</p>
                <p className="desc">{payload[0].value}</p>
            </div>
        );
    }
    return null;
};

export default History;
