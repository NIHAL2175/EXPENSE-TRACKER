# Expense Tracker

A modern, responsive expense tracking application built with React, TypeScript, and Tailwind CSS. Track your daily expenses, categorize them, and analyze your spending patterns with an intuitive interface.



- **Add Transactions**: Easily add new expenses with amount, description, and category
- **Category Filtering**: Filter transactions by expense categories
- **Data Export/Import**: Export your data as JSON and import it back
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Your data is automatically saved to your browser's local storage
- **Modern UI**: Clean, intuitive interface with Tailwind CSS styling

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## 🛠️ Installation

1. **Clone or download the project** to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd project
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

## 🏃‍♂️ Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

3. **The application will automatically reload** when you make changes to the code

## 📖 How to Use

### Adding a New Transaction

1. **Fill out the transaction form** at the top of the page:
   - **Amount**: Enter the expense amount (e.g., 25.50)
   - **Description**: Add a brief description of the expense (e.g., "Lunch at restaurant")
   - **Category**: Select the appropriate category from the dropdown menu

2. **Click "Add Transaction"** to save the expense

### Filtering Transactions

1. **Use the category filter** in the filter controls section:
   - Select a specific category from the dropdown to see only transactions in that category
   - Select "All Categories" to view all transactions

2. **Clear the filter** by clicking the "CLEAR FILTER" button

### Managing Your Data

#### Export Data
- Click the **"Export"** button to download your transaction data as a JSON file
- This creates a backup of all your expenses

#### Import Data
- Click the **"Import"** button to upload a previously exported JSON file
- This restores your transaction data from a backup

### Viewing Transaction Summary

The application automatically displays:
- **Total Balance**: Sum of all transactions
- **Total Income**: Sum of positive transactions
- **Total Expenses**: Sum of negative transactions
- **Category Chart**: Visual breakdown of expenses by category

## 🎨 Available Categories

The application includes these expense categories:
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Healthcare
- Utilities
- Housing
- Education
- Travel
- Other

## 🛠️ Development Commands

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📱 Browser Compatibility

This application works best in modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 💾 Data Storage

- All transaction data is stored in your browser's local storage
- Data persists between browser sessions
- Export your data regularly to prevent data loss
- Clear browser data will remove all stored transactions

## 🔧 Troubleshooting

### Application won't start
- Ensure Node.js is installed and up to date
- Run `npm install` to install dependencies
- Check if port 5173 is available

### Data not saving
- Ensure cookies and local storage are enabled in your browser
- Try exporting your data as a backup

### Import not working
- Ensure the file is a valid JSON format
- Check that the file was exported from this application

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy Expense Tracking! 💰** 