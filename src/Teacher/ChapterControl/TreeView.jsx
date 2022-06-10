import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import Link from '@mui/material/Link';
import AddFile from './AddFile';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '&.Mui-expanded': {
        fontWeight: theme.typography.fontWeightRegular,
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
        color: 'var(--tree-view-color)',
      },
      [`& .${treeItemClasses.label}`]: {
        fontWeight: 'inherit',
        color: 'inherit',
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 0,
      [`& .${treeItemClasses.content}`]: {
        paddingLeft: theme.spacing(2),
      },
    },
  }));
  
  function StyledTreeItem(props) {
    const {
      bgColor,
      color,
      labelIcon: LabelIcon,
      labelInfo,
      labelText,
      ...other
    } = props;
      return (
        <StyledTreeItemRoot
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
              <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                {labelText}
              </Typography>
              <Typography variant="caption" color="inherit">
                {labelInfo}
              </Typography>
            </Box>
          }
          style={{
            '--tree-view-color': color,
            '--tree-view-bg-color': bgColor,
          }}
          {...other}
        />
      );
    }
    
    StyledTreeItem.propTypes = {
      bgColor: PropTypes.string,
      color: PropTypes.string,
      labelIcon: PropTypes.elementType.isRequired,
      labelInfo: PropTypes.string,
      labelText: PropTypes.string.isRequired,
    };

export default function FileSystemNavigator( {chapterList} ) {

  return (
      <div>
          {chapterList.length > 0 ?chapterList.map((chapter) => {
            return (
                <TreeView
                  key={chapter.name}
                  aria-label="file system navigator"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{ height: 'auto',margin:'10px', flexGrow: 1, maxWidth: '95%' }}
                >
                  <TreeItem nodeId="1" label={chapter.name}>
                    {chapter.files?chapter.files.map(file => {
                      return (
                        <div key={file.id} style={{display: 'flex',alignItems: 'center',marginLeft:'20px'}}>
                          <PictureAsPdfOutlinedIcon style={{color:'red'}}/>
                          <Link 
                            style={{padding: '5px'}} target="_blank"
                            href={`https://schoolsystemmanagement-production-9724.up.railway.app/chapter-files/${file.fileUrl}`} underline="hover">
                            {file.name}
                          </Link>
                        </div>
                      )
                    }):''}
                    <AddFile chapterId={chapter.id}/>
                  </TreeItem>
                </TreeView>
            )
          }):<h3 style={{display: 'flex',justifyContent: 'center',}}>There is no chapter</h3>}
      </div>
  );
}