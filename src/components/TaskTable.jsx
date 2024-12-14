import React, { useEffect, useRef } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { useTaskContext } from '../context/TaskContext';

const STATUS_OPTIONS = ['To Do', 'In Progress', 'Done'];

function TaskTable({ searchQuery, statusFilter, tasks }) {
  const tableRef = useRef(null);
  const { updateTask, deleteTask } = useTaskContext();

  useEffect(() => {
    if (!tableRef.current) return;

    const table = new Tabulator(tableRef.current, {
      data: tasks,
      layout: 'fitColumns',
      responsiveLayout: 'collapse',
      columns: [
        { 
          title: 'ID', 
          field: 'id',
          width: 70,
          responsive: 2,
          verticalNavigation: 'editor'
        },
        { 
          title: 'Title', 
          field: 'title',
          editor: 'input',
          widthGrow: 2,
          responsive: 0,
          verticalNavigation: 'editor',
          cellEdited: async function(cell) {
            const task = cell.getRow().getData();
            try {
              await updateTask(task);
            } catch (error) {
              console.error('Failed to update title:', error);
              cell.restoreOldValue();
            }
          }
        },
        { 
          title: 'Description', 
          field: 'description',
          editor: 'input',
          widthGrow: 3,
          responsive: 1,
          verticalNavigation: 'editor',
          cellEdited: async function(cell) {
            const task = cell.getRow().getData();
            try {
              await updateTask(task);
            } catch (error) {
              console.error('Failed to update description:', error);
              cell.restoreOldValue();
            }
          }
        },
        { 
          title: 'Status',
          field: 'status',
          editor: "list",
          editorParams: {
            values: STATUS_OPTIONS,
            verticalNavigation: "editor",
            elementAttributes: {
              class: "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm"
            }
          },
          width: 120,
          responsive: 0,
          verticalNavigation: 'editor',
          cellClick: function(e, cell) {
            cell.edit(true);
          },
          cellEdited: async function(cell) {
            const task = cell.getRow().getData();
            try {
              await updateTask(task);
              cell.getTable().redraw(true);
            } catch (error) {
              console.error('Failed to update status:', error);
              cell.restoreOldValue();
            }
          },
          formatter: function(cell) {
            const value = cell.getValue() || 'To Do';
            let className;
            
            switch(value) {
              case 'In Progress':
                className = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                break;
              case 'Done':
                className = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
                break;
              default: // To Do
                className = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
            }
            
            return `<span class="px-3 py-1 text-xs font-medium rounded-full cursor-pointer hover:opacity-80 ${className}">${value}</span>`;
          }
        },
        { 
          title: 'Actions',
          formatter: function() {
            return '<button class="delete-btn text-red-500 hover:text-red-700"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>';
          },
          width: 80,
          responsive: 0,
          cellClick: function(e, cell) {
            if (e.target.closest('.delete-btn')) {
              const task = cell.getRow().getData();
              if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(task.id);
              }
            }
          }
        }
      ],
      pagination: true,
      paginationSize: 20,
      paginationSizeSelector: [5, 10, 20, 30],
      movableColumns: true,
      rowFormatter: function(row) {
        const element = row.getElement();
        element.classList.add('border-b', 'border-gray-100');
      },
      placeholder: 'No Tasks Available'
    });

    // Apply filters when searchQuery or statusFilter changes
    const applyFilters = () => {
      table.clearFilter(); // Clear previous filters
  
      // Apply search filter
      if (searchQuery) {
        table.addFilter([
          { field: 'title', type: 'like', value: searchQuery },
          { field: 'description', type: 'like', value: searchQuery },
        ], 'or'); // Combine filters with 'or' logic
      }
  
      // Apply status filter
      if (statusFilter) {
        table.addFilter('status', '=', statusFilter);
      }
    };
    // console.log('Search Query:', searchQuery);

    // Call `applyFilters` whenever searchQuery or statusFilter changes
    applyFilters();

    // Add custom classes to Tabulator elements
    const tableElement = tableRef.current;
    tableElement.classList.add('w-full', 'max-w-4xl', 'bg-white', 'rounded-lg', 'shadow-sm', 'border-0');

    const headers = tableElement.querySelectorAll('.tabulator-header');
    headers.forEach(header => {
      header.classList.add('bg-gray-50', 'border-b', 'border-gray-200');
    });

    const cells = tableElement.querySelectorAll('.tabulator-cell');
    cells.forEach(cell => {
      cell.classList.add('px-4', 'py-3');
    });

    const cols = tableElement.querySelectorAll('.tabulator-col');
    cols.forEach(col => {
      col.classList.add('px-4', 'py-3', 'font-medium', 'text-gray-900');
    });

    // Mobile optimizations
    if (window.innerWidth <= 640) {
      const mobileCells = tableElement.querySelectorAll('.tabulator-cell, .tabulator-col');
      mobileCells.forEach(cell => {
        cell.classList.add('px-2', 'py-2', 'text-sm');
      });
    }

    return () => {
      table.destroy();
    };
  }, [ searchQuery, statusFilter]);
  useEffect(() => {
    const table = tableRef.current?.tableInstance;
    if (!table) return;

    // Clear existing filters
    table.clearFilter();

    // Apply search filters
    if (searchQuery) {
      table.addFilter([
        { field: 'title', type: 'like', value: searchQuery },
        { field: 'description', type: 'like', value: searchQuery },
      ], 'or');
    }

    // Apply status filter
    if (statusFilter) {
      table.addFilter('status', '=', statusFilter);
    }

    console.log('Filters Applied:', table.getFilters()); // Debug active filters
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    const table = Tabulator.findTable(tableRef.current)[0];
    if (table) {
      table.setData(tasks); // Update data without reinitializing the table
    }
  }, [tasks, updateTask, deleteTask,]); // Update table data when tasks change

  return (
    <div className="w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="overflow-x-auto">
        <div ref={tableRef} className="min-w-full"></div>
      </div>
    </div>
  );
}

export default TaskTable;
