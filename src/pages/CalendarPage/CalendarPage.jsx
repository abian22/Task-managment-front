import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getAllMyProjects } from "../../services/project"; 
import { getTasksByProject } from "../../services/task";
function CalendarPage() {
  const localizer = dayjsLocalizer(dayjs);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchProjectsAndTasks() {
      try {
       
        const projectsResponse = await getAllMyProjects();
        const projects = projectsResponse.data.projects;
        console.log("Proyectos recibidos:", projects);

       
        const projectEvents = projects.map((project) => {
          const startDate = dayjs(project.start_date).toDate(); 
          const endDate = dayjs(project.end_date).toDate();

          return {
            title: project.title,
            start: startDate,
            end: endDate,
            allDay: true,
            type: 'project' 
          };
        });

       
        const taskPromises = projects.map((project) =>
          getTasksByProject(project.id)
        );

       
        const tasksResponses = await Promise.all(taskPromises);
        const allTasks = tasksResponses.flat();
        console.log("Tareas recibidas:", allTasks);

       
        const taskEvents = allTasks.map((task) => ({
          title:  task.title,
          start: dayjs(task.start_task_date).toDate(), 
          end: dayjs(task.end_task_date).toDate(),
          type: 'task' 
        }));

        const allEvents = [...projectEvents, ...taskEvents];
        setEvents(allEvents);

        console.log("Todos los eventos combinados para el calendario:", allEvents);
      } catch (error) {
        console.error("Error fetching projects and tasks:", error);
      }
    }

    fetchProjectsAndTasks();
  }, []);

 
  const eventStyleGetter = (event) => {
    let backgroundColor = event.type === 'project' ? 'green' : '#3174ad'; 
    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <div style={{ visibility: "visible" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "700px", width: "700px", marginTop: "20px" }}
        eventPropGetter={eventStyleGetter} 
      />
    </div>
  );
}

export default CalendarPage;
