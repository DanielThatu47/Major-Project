import {
    ChartCanvas,
    Chart,
    series,
    scale,
    coordinates,
    tooltip,
    axes,
    helper,
} from 'react-financial-charts';

const { CandlestickSeries } = series;
const { discontinuousTimeScaleProvider } = scale;
const { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } = coordinates;
const { OHLCTooltip } = tooltip;
const { XAxis: FinancialXAxis, YAxis: FinancialYAxis } = axes;
const { fitWidth } = helper;

const CandlestickChartComponent = ({ data, width, height }) => {
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => new Date(d.date));
    const {
        data: chartData,
        xScale,
        xAccessor,
        displayXAccessor,
    } = xScaleProvider(data);

    const xExtents = [
        xAccessor(chartData[0]),
        xAccessor(chartData[chartData.length - 1]),
    ];

    return (
        <ChartCanvas
            height={height}
            width={width}
            ratio={1}
            data={chartData}
            xScale={xScale}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
            seriesName="Candlestick"
            xExtents={xExtents}
        >
            <Chart id={1} yExtents={d => [d.high, d.low]}>
                <FinancialXAxis />
                <FinancialYAxis />
                <CandlestickSeries />
                <OHLCTooltip origin={[-40, 0]} />
            </Chart>
            <CrossHairCursor />
        </ChartCanvas>
    );
};

// Wrapping CandlestickChartComponent with fitWidth and exporting as CandlestickChart
export const CandlestickChart = fitWidth(CandlestickChartComponent);
