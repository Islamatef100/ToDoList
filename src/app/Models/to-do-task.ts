export interface ToDoTask 
{
    id           :string,
    title        :string,
    completed    :boolean,
    taskDate?    :string,
    location?    :string,
    UserId       :string
}
export interface User
 {
    id           :number,
    UserId       :string;
    UserName?    :string,
    email        :string,
    phoneNumber? :number,
    password     :string, 
}                       