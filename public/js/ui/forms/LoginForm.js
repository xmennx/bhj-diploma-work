/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (response) => {
      if (response.success) {
        this.element.reset();
        App.setState('user-logged');

        const modal = this.element.closest('.modal');
        if (modal) {
          const modalInstance = App.getModal(modal.id);
          modalInstance.close();
        }
      } else {
        console.error(response.error || 'Ошибка авторизации');
      }
    });
  }
}