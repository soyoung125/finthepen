/* eslint-disable max-len */
import { Alert, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AnalysisGraph from './AnalysisGraph';
import AnalysisList from './analysisList/AnalysisList';
import PATH from '../../../domain/constants/path';
import useHeader from '../../../hooks/useHeader';
import {
  selectAnalyzedData, selectDate, updateAnalyzedData
} from '../../../app/redux/slices/scheduleSlice';
import { AnalysisData } from '../../../types/common';
import { useAppDispatch } from '../../../app/redux/hooks';

function AnalysisContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const date = useSelector(selectDate);
  const { data, total } = useSelector(selectAnalyzedData);
  const [widthRatio, setWidthRatio] = useState(1);

  useHeader(true, 'analysis');

  useEffect(() => {
    dispatch(updateAnalyzedData());
    setWidthRatio(Math.ceil(screen.width / 450) * 50);
  }, [date]);

  const clickListItem = (category: AnalysisData) => {
    navigate(PATH.analysisDetail, { state: { color: category.color, category: category.label, type: category.nestedType } });
  };

  const hexToRGB = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    total > 0 ? (
      <>
        <Box sx={{ width: '100vw', height: `calc(100vw - ${widthRatio}px)`, paddingX: 1 }}>
          <AnalysisGraph data={data} total={total} widthRatio={widthRatio} />
        </Box>
        <AnalysisList data={data} clickListItem={clickListItem} hexToRGB={hexToRGB} />
      </>
    ) : <Alert sx={{ margin: 2 }} severity="info">이체/지출 데이터가 존재하지 않습니다.</Alert>
  );
}
export default AnalysisContainer;
/**
 * 분석 페이지
 */
