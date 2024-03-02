import React, { useState } from "react";
import { Row, Col, Dropdown, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FeatherIcons from "feather-icons-react";

// components
import PageTitle from "../../../../components/PageTitle";

import TaskSection from "./Section";
import Task from "./Task";

// dummy data
import { todayTasks, upcomingTasks, otherTasks, TaskItemTypes } from "./data";

// Task List
const TaskList = () => {
  const [todayTask] = useState<TaskItemTypes[]>([...todayTasks]);
  const [upcomingTask] = useState<TaskItemTypes[]>([...upcomingTasks]);
  const [otherTask] = useState<TaskItemTypes[]>([...otherTasks]);
  const [selectedTask, setSelectedTask] = useState<TaskItemTypes>(
    todayTasks[0]
  );

  /**
   * Selects the task
   * @param {*} taks
   */
  const selectTask = (task: TaskItemTypes) => {
    setSelectedTask(task);
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tasks", path: "/apps/tasks/list" },
          { label: "Tasks List", path: "/apps/tasks/list", active: true },
        ]}
        title={"Medical History"}
      />
      <Row>
        <Col xl={8}>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Row className="mt-3">
                    <Col>
                      {/* tasks */}
                      <div>
                        <TaskSection
                          title="Today"
                          tasks={todayTask}
                          selectTask={selectTask}
                        ></TaskSection>
                      </div>
                      <div className="mt-4">
                        <TaskSection
                          title="Upcoming"
                          tasks={upcomingTask}
                          selectTask={selectTask}
                        ></TaskSection>
                      </div>
                      <div className="mt-4 mb-4">
                        <TaskSection
                          title="Other"
                          tasks={otherTask}
                          selectTask={selectTask}
                        ></TaskSection>
                      </div>
                    </Col>
                  </Row>

                  <Row className="mb-3 mt-4">
                    <Col xs={12}>
                      <div className="text-center">
                        <Link to="#" className="btn btn-white mb-3">
                          <FeatherIcons
                            icon="loader"
                            className="icon-dual icon-xs me-2"
                          ></FeatherIcons>
                          Load more
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col xl={4}>
          <Task selectedTask={selectedTask} />
        </Col>
      </Row>
    </>
  );
};

export default TaskList;
