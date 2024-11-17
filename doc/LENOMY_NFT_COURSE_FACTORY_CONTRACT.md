# Lenomy NFT Course Factory Contract Documentation

The `LenomyNFTCourseFactory` contract enables the creation, management, and retrieval of NFT courses. Each course is represented as an ERC-721 token, and this factory contract facilitates decentralized management of these courses.

---

## Table of Contents

- [Key Features](#key-features)
- [Contract Address](#contract-address)
- [Core Functions](#core-functions)
- [Modifiers](#modifiers)
- [Error Handling](#error-handling)
- [Events](#events)
- [License](#license)

---

## Key Features

1. **Create NFT Courses**: Enables creators to deploy new NFT courses with metadata.
2. **Manage NFT Courses**: Allows updating and removing existing courses.
3. **Decentralized Ownership**: Restricts operations to course creators for security.
4. **Course Data Access**: Provides a view of course metadata for users.

---

## Contract Address

| **Network** | **Address**       |
|-------------|-------------------|
| Hekla     | *0x4336827De7327D9339b78759Fc5ec60d3f7E3572* |

---

## Core Functions

### **Course Creation**

#### `createCourse(LenomyNFTCourse.CourseData memory _courseData) external returns (address)`
- Deploys a new NFT course contract and stores its metadata in the factory.
- Emits `NFTCourseCreated` on successful creation.
- Requires:
  - Valid course data to be passed.

### **Course Management**

#### `removeCourse(address _courseAddress) external`
- Removes an existing course from the factory.
- Emits `NFTCourseRemoved` on successful removal.
- Requires:
  - Caller must be the course creator.

#### `updateCourse(address _courseAddress, LenomyNFTCourse.CourseData memory _courseData) external`
- Updates the metadata of an existing course.
- Emits `NFTCourseUpdated` on successful update.
- Requires:
  - Caller must be the course creator.

### **Course Retrieval**

#### `getCourse(address _courseAddress) external view returns (LenomyNFTCourse.CourseData memory)`
- Retrieves the metadata of a specific course.
- Returns:
  - The `CourseData` structure containing course details.

---

## Modifiers

### `isCreator(address _nftCourseAddress)`
- Ensures the caller is the creator of the specified NFT course.

### `isOwner(address _nftCourseAddress)`
- Ensures the caller is the owner of the NFT course.

---

## Error Handling

| **Error**        | **Description**                    |
|-------------------|------------------------------------|
| `NotOwner`       | Caller is not the owner of the course. |
| `NotCreator`     | Caller is not the creator of the course. |

---

## Events

| **Event**             | **Description**                                        |
|-----------------------|--------------------------------------------------------|
| `NFTCourseCreated`    | Emitted when a new NFT course is created.              |
| `NFTCourseUpdated`    | Emitted when an existing NFT course is updated.        |
| `NFTCourseRemoved`    | Emitted when an NFT course is removed from the factory.|

---

## Course Data Structure

The `LenomyNFTCourse.CourseData` structure stores metadata for each course:

| **Field**              | **Type**        | **Description**                                   |
|------------------------|-----------------|---------------------------------------------------|
| `name`                | `string`        | The name of the course.                          |
| `symbol`              | `string`        | The token symbol for the NFT course.             |
| `creator`             | `address`       | The creator of the course.                       |
| `description`         | `string`        | A brief description of the course.               |
| `price`               | `uint256`       | The price of the course.                         |
| `encryptedCID`        | `string`        | Encrypted content identifier for secure access.  |
| `rentalUnitPrice`     | `uint256`       | The unit price for renting the course.           |
| `rentalUnitTimestamp` | `uint256`       | The rental duration in seconds.                  |

---

## License

This contract is licensed under the MIT License. See the `LICENSE` file for more details.
