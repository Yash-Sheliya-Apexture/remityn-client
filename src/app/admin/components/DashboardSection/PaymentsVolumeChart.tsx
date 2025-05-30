
// frontend/src/components/DashboardSection/PaymentsVolumeChart.tsx
import React from 'react';
import { VolumeChart } from './VolumeChart';
import { TbMoneybag } from 'react-icons/tb';

export default function PaymentsVolumeChart() {
    return (
        <VolumeChart
            title="Add Money Volume"
            description="Total incoming Add Money volume."
            chartType="payments"
            icon={<TbMoneybag className="text-primary size-6" />} // Pass the icon here 
            yAxisLabel="Payment Amount"
            dataKey="volume"
        />
    );
}